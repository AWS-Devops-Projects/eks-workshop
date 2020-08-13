---
title: "Cloud9 Workspace"
chapter: false
weight: 20
pre: "<b>1.2. </b>"
---

{{% notice warning %}}
The Cloud9 workspace should be built by an IAM user with Administrator privileges,
not the root account user. Please ensure you are logged in as an IAM user, not the root account user.
{{% /notice %}}

{{% notice tip %}}
Ad blockers, javascript disablers, and tracking blockers should be disabled for
the cloud9 domain, or connecting to the workspace might be impacted.
Cloud9 requires third-party-cookies. You can whitelist the [specific domains]( https://docs.aws.amazon.com/cloud9/latest/user-guide/troubleshooting.html#troubleshooting-env-loading).
{{% /notice %}}

### Launch Cloud9 in your closest region:

> Log into the AWS Console.

- [Create a Cloud9 Environment](https://ap-southeast-1.console.aws.amazon.com/cloud9/home?region=ap-southeast-1)
- Select **Create environment**
- Name it **`Cloud9`**, and select **Next Step**
- Stick with the default settings, and select **Next Step**: `t3.micro` & `Amazon Linux` | ~~Ubuntu Server 18.04 LTS~~
- Lastly, select **Create Environment**
- When it comes up, customize the environment by closing the **welcome tab**
and **lower work area**, and opening a new **terminal** tab in the main work area

> If you like this theme, you can choose it yourself by selecting **View / Themes / Solarized / Solarized Dark**
in the Cloud9 workspace menu.