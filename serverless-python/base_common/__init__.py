import os
from aws_cdk.core import Stack, Construct, Environment
from aws_cdk import aws_apigateway, aws_route53, aws_route53_targets, aws_certificatemanager, aws_ec2

# we need default values here since aws-cdk-examples build synthesizes the app
ACCOUNT=os.environ.get('AWS_ACCOUNT', '701571471198')
REGION=os.environ.get('AWS_REGION', 'ap-southeast-1')
VPC_ID = os.environ.get('AWS_VPC_ID', 'vpc-04f6bf98089c883b4')
ZONE_NAME = os.environ.get('AWS_ZONE_NAME', 'aws.job4u.io')
ZONE_ID = os.environ.get('AWS_ZONE_ID', 'Z18LLN6ULFZKNH')
ZONE_CERT = os.environ.get('AWS_ZONE_CERT', 'arn:aws:acm:ap-southeast-1:701571471198:certificate/12049ee9-d585-44b4-bd06-00190aa5cca7')

AWS_ENV = Environment(account=ACCOUNT, region=REGION)

class BaseStack(Stack):
    """
    A base CDK stack class for all stacks defined in our fun little company.
    """

    def __init__(self, scope: Construct, id: str, **kwargs):
        super().__init__(scope, id, env=AWS_ENV, **kwargs)

        # lookup our pre-created VPC by ID
        self._vpc = aws_ec2.Vpc.from_lookup(self, "vpc", vpc_id=VPC_ID)

    @property
    def base_vpc(self) -> aws_ec2.IVpc:
        """
        :return: The walters co. vpc
        """
        return self._vpc

    def map_base_subdomain(self, subdomain: str, api: aws_apigateway.RestApi) -> str:
        """
        Maps a sub-domain of aws.job4u.io to an API gateway

        :param subdomain: The sub-domain (e.g. "www")
        :param api: The API gateway endpoint
        :return: The base url (e.g. "https://www.aws.job4u.io")
        """
        domain_name = subdomain + '.' + ZONE_NAME
        url = 'https://' + domain_name

        cert = aws_certificatemanager.Certificate.from_certificate_arn(self, 'DomainCertificate', ZONE_CERT)
        hosted_zone = aws_route53.HostedZone.from_hosted_zone_attributes(self, 'HostedZone',
                                                                         hosted_zone_id=ZONE_ID,
                                                                         zone_name=ZONE_NAME)

        # add the domain name to the api and the A record to our hosted zone
        domain = api.add_domain_name('Domain', certificate=cert, domain_name=domain_name)

        aws_route53.ARecord(
            self, 'UrlShortenerDomain',
            record_name=subdomain,
            zone=hosted_zone,
            target=aws_route53.RecordTarget.from_alias(aws_route53_targets.ApiGatewayDomain(domain)))

        return url


__all__ = ["BaseStack"]
