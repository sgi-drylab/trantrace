grant all PRIVILEGES on *.* to root@'%' identified by 'WelcomeSGI1' with grant option;
flush privileges;
SET@@GLOBAL.sql_mode='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';

