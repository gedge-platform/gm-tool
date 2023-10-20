import { makeAutoObservable, runInAction, toJS } from "mobx";

class Template {
  containerImageList = [
    {
      name: "nginx",
      versions: ["latest", "1.24.0", "1.23.0", "1.20.0"],
      port: 80,
      env: [],
      type: "LoadBalancer",
    },
    {
      name: "mysql",
      versions: ["latest", "8.0", "5.7.43"],
      port: 3306,
      env: [
        { name: "MYSQL_ROOT_PASSWORD", value: "your-root-password" },
        { name: "MYSQL_DATABASE", value: "your-database-name" },
      ],
      type: "ClusterIP",
    },
  ];

  deploymentYamlTemplate = {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: "",
      namespace: "",
    },
    spec: {
      replicas: 1,
      selector: {
        matchLabels: {
          app: "",
        },
      },
      template: {
        metadata: {
          labels: {
            app: "",
          },
        },
        spec: {
          containers: [
            {
              name: "",
              image: "",
              env: [],
              ports: [
                {
                  containerPort: 80,
                },
              ],
            },
          ],
        },
      },
    },
  };

  serviceYamlTemplate = {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      name: "",
      namespace: "",
    },
    spec: {
      selector: {
        app: "",
      },
      ports: [
        {
          protocol: "TCP",
          port: 80,
          targetPort: 80,
        },
      ],
      type: "",
    },
  };

  // deploymentYamlTemplate = {
  //   apiVersion: "v1",
  //   kind: "PersistentVolumeClaim",
  //   metadata: {
  //     name: "data-nginx-test",
  //   },
  //   spec: {
  //     accessModes: -"ReadWriteOnce",
  //     resources: {
  //       requests: {
  //         storage: "8Gi",
  //       },
  //       storageClassName: "nfs-client",
  //     },
  //   },
  // };
  // podYamlTemplate = {
  //   apiVersion: "v1",
  //   kind: "Pod",
  //   metadata: {
  //     name: "nginx4",
  //   },
  //   spec: {
  //     containers: [
  //       {
  //         name: "nginx",
  //         image: "nginx:1.14.2",
  //         ports: [
  //           {
  //             containerPort: "80",
  //           },
  //         ],
  //         resources: {
  //           limits: {
  //             "nvidia.com/gpu": "1",
  //           },
  //         },
  //         volumeMounts: [
  //           {
  //             mountPath: "/var/www/html1",
  //             name: "mypd",
  //           },
  //         ],
  //       },
  //     ],
  //     volumes: [
  //       {
  //         name: "mypd",
  //         persistentVolumeClaim: {
  //           claimName: "data-nginx-test",
  //         },
  //       },
  //     ],
  //   },
  // };
  // serviceYamlTemplate = {
  //   apiVersion: "v1",
  //   kind: "Service",
  //   metadata: {
  //     name: "nginx-service",
  //   },
  //   spec: {
  //     type: "NodePort",
  //     selector: {
  //       app: "nginx10",
  //     },
  //     ports: [
  //       {
  //         name: "http",
  //         port: 80,
  //         targetPort: 80,
  //       },
  //     ],
  //   },
  // };

  constructor() {
    makeAutoObservable(this);
  }

  setDeploymentYamlTemplateFromAppInfo = (appInfo) => {
    this.deploymentYamlTemplate.metadata.name = appInfo.appName + "-deployment";
    this.deploymentYamlTemplate.metadata.namespace = appInfo.appWorkspace;
    this.deploymentYamlTemplate.spec.replicas = appInfo.appReplicas;
    this.deploymentYamlTemplate.spec.selector.matchLabels.app =
      appInfo.app + "-" + appInfo.appName;
    this.deploymentYamlTemplate.spec.template.metadata.labels.app =
      appInfo.app + "-" + appInfo.appName;
    this.deploymentYamlTemplate.spec.template.spec.containers[0].name =
      appInfo.app;
    this.deploymentYamlTemplate.spec.template.spec.containers[0].image =
      appInfo.app + ":" + appInfo.appVersion;
    this.deploymentYamlTemplate.spec.template.spec.containers[0].env =
      appInfo.appEnv;
    this.deploymentYamlTemplate.spec.template.spec.containers[0].ports[0].containerPort =
      appInfo.appPort;

    this.serviceYamlTemplate.metadata.name = appInfo.appName + "-service";
    this.serviceYamlTemplate.metadata.namespace = appInfo.appWorkspace;
    this.serviceYamlTemplate.spec.selector.app =
      appInfo.app + "-" + appInfo.appName;
    this.serviceYamlTemplate.spec.ports[0].port = appInfo.appPort;
    this.serviceYamlTemplate.spec.ports[0].targetPort = appInfo.appPort;
    if (appInfo.app === "nginx") {
      this.serviceYamlTemplate.spec.type = "LoadBalancer";
    } else {
      this.serviceYamlTemplate.spec.type = "ClusterIP";
    }
  };
}

const templateStore = new Template();
export default templateStore;
