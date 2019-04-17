const _ = require('lodash');
const persistentStore = require('../store/persistentStore');

quayCatalogSourceImage = 'quay.io/redhat-developer/operator-registry:latest';

const generateInstallYaml = (serverRequest, serverResponse) => {
  try {
    const operatorName = serverRequest.url.replace('/install/', '').replace('.yaml', '');
    if (operatorName.indexOf("devconsole") == -1) {
      quayCatalogSourceImage = 'quay.io/shbose/rhd-operatorhub-registry:latest';
    }
    persistentStore.getVersionedOperator(operatorName, (operator, err) => {
      if (err) {
        serverResponse.status(500).send(err);
        return;
      }
      const { channels, packageName, globalOperator } = operator;
      if (!_.size(channels) || !packageName) {
        serverResponse.status(500).send(`Operator ${operatorName} has invalid or no package information.`);
        return;
      }
      const operatorChannel = channels[0].name;

      const installYaml = `apiVersion: v1
kind: Namespace
metadata:
  name: my-${packageName}
---
apiVersion: operators.coreos.com/v1alpha1
kind: CatalogSource
metadata:
  name: rhd-operatorhub-catalog
  namespace: my-${packageName}
spec:
  sourceType: grpc
  image: ${quayCatalogSourceImage}
  displayName: Community Operators
  publisher: RHD Operator Hub
---
apiVersion: operators.coreos.com/v1alpha2
kind: OperatorGroup
metadata:
  name: operatorgroup
  namespace: my-${packageName}
spec:
  targetNamespaces:
  - my-${packageName}
---
apiVersion: operators.coreos.com/v1alpha1
kind: Subscription
metadata:
  name: my-${packageName}
  namespace: my-${packageName}
spec:
  channel: ${operatorChannel}
  name: ${packageName}
  source: rhd-operatorhub-catalog
  sourceNamespace: my-${packageName}`;

      const globalInstallYaml = `apiVersion: operators.coreos.com/v1alpha1
kind: CatalogSource
metadata:
  name: rhd-operatorhub-catalog
  namespace: olm
spec:
  sourceType: grpc
  image: ${quayCatalogSourceImage}
  displayName: Community Operators
  publisher: RHD Operator Hub
---
apiVersion: operators.coreos.com/v1alpha1
kind: Subscription
metadata:
  name: my-${packageName}
  namespace: operators
spec:
  channel: ${operatorChannel}
  name: ${packageName}
  source: rhd-operatorhub-catalog
  sourceNamespace: olm`;

      serverResponse.send(globalOperator ? globalInstallYaml : installYaml);
    });
  } catch (e) {
    serverResponse.status(500).send(e.message);
  }
};



const generateInstallYaml4 = (serverRequest, serverResponse) => {
  try {
    const operatorName = serverRequest.url.replace('/installopenshift4/', '').replace('.yaml', '');
    if (operatorName.indexOf("devconsole") == -1) {
      quayCatalogSourceImage = 'quay.io/shbose/rhd-operatorhub-registry:latest';
    }
    persistentStore.getVersionedOperator(operatorName, (operator, err) => {
      if (err) {
        serverResponse.status(500).send(err);
        return;
      }
      const { channels, packageName, globalOperator } = operator;
      if (!_.size(channels) || !packageName) {
        serverResponse.status(500).send(`Operator ${operatorName} has invalid or no package information.`);
        return;
      }
      const operatorChannel = channels[0].name;

      const installYaml = `apiVersion: v1
kind: Namespace
metadata:
  name: my-${packageName}
---
apiVersion: operators.coreos.com/v1alpha1
kind: CatalogSource
metadata:
  name: rhd-operatorhub-catalog
  namespace: my-${packageName}
spec:
  sourceType: grpc
  image: ${quayCatalogSourceImage}
  displayName: Community Operators
  publisher: RHD Operator Hub
---
apiVersion: operators.coreos.com/v1alpha2
kind: OperatorGroup
metadata:
  name: operatorgroup
  namespace: my-${packageName}
spec:
  targetNamespaces:
  - my-${packageName}
---
apiVersion: operators.coreos.com/v1alpha1
kind: Subscription
metadata:
  name: my-${packageName}
  namespace: my-${packageName}
spec:
  channel: ${operatorChannel}
  name: ${packageName}
  source: rhd-operatorhub-catalog
  sourceNamespace: my-${packageName}`;

      const globalInstallYaml = `apiVersion: operators.coreos.com/v1alpha1
kind: CatalogSource
metadata:
  name: rhd-operatorhub-catalog
  namespace: openshift-operator-lifecycle-manager
spec:
  sourceType: grpc
  image: ${quayCatalogSourceImage}
  displayName: Community Operators
  publisher: RHD Operator Hub
---
apiVersion: operators.coreos.com/v1alpha1
kind: Subscription
metadata:
  name: my-${packageName}
  namespace: openshift-operators
spec:
  channel: ${operatorChannel}
  name: ${packageName}
  source: rhd-operatorhub-catalog
  sourceNamespace: openshift-operator-lifecycle-manager`;

      serverResponse.send(globalOperator ? globalInstallYaml : installYaml);
    });
  } catch (e) {
    serverResponse.status(500).send(e.message);
  }
};


const yamlService = {
  generateInstallYaml,
  generateInstallYaml4
};

module.exports = yamlService;
