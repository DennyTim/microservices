# Reference

### Add new project

1. Create a folder for project.
2. Move `.dockerignore, index.ts, nats-wrapper.ts, Dockerfile, tsconfig.json` into necessary folder
3. Install dependencies.
4. Build docker-image. ```docker build -t *dockerId*/expiration . ```
5. Push it to the docker-repo. ```docker push *dockerId*/expiration ```
6. (optional) Create depl for db inside `infra/k8s`
7. Create depl for application-service inside `infra/k8s`
8. Add to `skaffold.yaml` new project like below
```yaml    
     - image: *dockerid*/expiration
       context: expiration
       docker:
         dockerfile: Dockerfile
       sync:
         manual:
           - src: 'src/**/*.ts'
             dest: .
```
* Check deployments ```shell kubectl get pods```

### Add new secret

1. Add new secret
```shell
   kubectl create secret generic *name* --from-literal *key*=*value*
```
2. Check it after adding
```shell
    kubectl get secrets
```
3. Delete secret if it's wrong
```shell
    kubectl delete secret *name*
```
