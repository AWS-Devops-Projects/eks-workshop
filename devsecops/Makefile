APP_DIR ?=$(PWD)
DOCKER_PATH ?= ./Dockerfile
PROJECT_NAME ?= devsecops
SERVICE_NAME ?= devsecopslb
SERVICE_TYPE ?= 'Load Balanced Web Service'
PROJECT_PORT ?= '8080'
ENV_NAME ?= prod
CHECK_DOCKER := $(shell docker --version)

all: docker install-copilot init-app env deploy
.PHONY: all

install-copilot:
	@$(shell $(PWD)/install.sh)

init-app:
	mkdir -p ${APP_DIR}
	cd ${APP_DIR}
	copilot init --app ${PROJECT_NAME}  \
  		--svc ${SERVICE_NAME}           \
  		--svc-type ${SERVICE_TYPE} 		\
  		--dockerfile ${DOCKER_PATH}     \
		--profile default 				\
		--port ${PROJECT_PORT} 			\

docker:
	@echo ${CHECK_DOCKER}
	
env:
	copilot env init --name ${ENV_NAME} --profile default --app ${PROJECT_NAME}
	
deploy:
	copilot svc deploy --name ${SERVICE_NAME} --env ${ENV_NAME}

clean:
	copilot env delete --name ${ENV_NAME} --profile default --yes
	copilot app delete --yes