# HPC Interface Dev

For the project information, please see
[the project website](https://peterwzhang.github.io/MRI/).

## Deployment instructions

To deploy, execute the following (from the MRI directory):

```sh
./build.sh

# where hpci-myuser is the LDAP credential issued by OIT
rsync -r --progress ./backend/target/hpc_interface.war hpci-myuser@hpc-interface-dev.ua.edu:
ssh hpci-myuser@hpc-interface-dev.ua.edu

# Then, while logged in over SSH:
  cd /srv/tomcat/webapps
  sudo systemctl stop tomcat
  sudo rm -fr ROOT ROOT.war
  sudo cp ~/hpc_interface.war ROOT.war
  sudo systemctl start tomcat
```

If issues arise, a good place to check is `/var/log/tomcat/spring.log` (must be
read as root).
