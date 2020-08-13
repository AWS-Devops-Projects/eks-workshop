FROM jenkins/jenkins:lts

USER root
RUN apt-get update && apt-get install -y ruby make
USER jenkins

EXPOSE 8080
EXPOSE 50000