from aws_cdk.core import Construct
from aws_cdk import aws_ecs, aws_ec2


## a User-Defined Construct
## just a Class the inherits from the core.Construct Base Class
class Traffic101(Construct):
    """
    An HTTP traffic generator.

    Hits a specified URL at some TPS.
    """

    def __init__(self, scope: Construct, id: str, *, vpc: aws_ec2.IVpc, url: str, tps: int):
        """
        Defines an instance of the traffic generator.

        :param scope: construct scope
        :param id:    construct id
        :param vpc:   the VPC in which to host the traffic generator
        :param url:   the URL to hit
        :param tps:   the number of transactions per second
        """
        super().__init__(scope, id)

        ## Define an ECS Cluster hosted within the requested VPC
        cluster = aws_ecs.Cluster(self, 'cluster', vpc=vpc)

        ## Define our ECS Task Definition with a single Container.
        ## The image is built & published from a local asset directory
        task_definition = aws_ecs.FargateTaskDefinition(self, 'PingTask')
        task_definition.add_container('Pinger',
                                      image=aws_ecs.ContainerImage.from_asset("pinger"),
                                      environment={'URL': url})

        ## Define our Fargate Service. TPS determines how many Instances we
        ## want from our Task (each Task produces a single TPS)
        aws_ecs.FargateService(self, 'service',
                               cluster=cluster,
                               task_definition=task_definition,
                               desired_count=tps)
