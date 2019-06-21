package lk.ijse.dep.spring.last.main;

import lk.ijse.dep.spring.last.repository.CustomerRepository;
import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.Database;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

@Configuration
@PropertySource("classpath:application.properties")
@EnableTransactionManagement
@EnableJpaRepositories(basePackageClasses = CustomerRepository.class)
public class JpaConfig {

    @Autowired
    private Environment env;

    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(DataSource ds, JpaVendorAdapter vendorAdapter) {
        LocalContainerEntityManagerFactoryBean lcemfb = new LocalContainerEntityManagerFactoryBean();
        lcemfb.setDataSource(ds);
        lcemfb.setJpaVendorAdapter(vendorAdapter);
        lcemfb.setPackagesToScan("lk.ijse.dep.spring.last.entity");
        return lcemfb;
    }

    @Bean
    public DataSource dataSource() {
//        DriverManagerDataSource ds = new DriverManagerDataSource();
//        ds.setDriverClassName(env.getRequiredProperty("javax.persistence.jdbc.driver"));
//        ds.setUrl(env.getRequiredProperty("javax.persistence.jdbc.url"));
//        ds.setUsername(env.getRequiredProperty("javax.persistence.jdbc.user"));
//        ds.setPassword(env.getRequiredProperty("javax.persistence.jdbc.password"));
//        return ds;
        BasicDataSource bds = new BasicDataSource();
        bds.setDriverClassName(env.getRequiredProperty("javax.persistence.jdbc.driver"));
        bds.setUsername(env.getRequiredProperty("javax.persistence.jdbc.user"));
        bds.setPassword(env.getRequiredProperty("javax.persistence.jdbc.password"));
        bds.setUrl(env.getRequiredProperty("javax.persistence.jdbc.url"));

//        connection pool

        bds.setMaxTotal(Integer.parseInt(env.getRequiredProperty("setMaxTotal")));
        bds.setInitialSize(Integer.parseInt(env.getRequiredProperty("setInitialSize")));
        bds.setMaxIdle(Integer.parseInt(env.getRequiredProperty("setMaxIdle")));
return bds;
    }

    @Bean
    public JpaVendorAdapter jpaVendorAdapter() {
        HibernateJpaVendorAdapter adapter = new HibernateJpaVendorAdapter();
        adapter.setDatabase(Database.MYSQL);
        adapter.setDatabasePlatform(env.getRequiredProperty("hibernate.dialect"));
        adapter.setShowSql(Boolean.getBoolean(env.getRequiredProperty("hibernate.show_sql")));
        adapter.setGenerateDdl(env.
                getRequiredProperty("hibernate.hbm2ddl.auto").
                equalsIgnoreCase("update"));
        return adapter;
    }

    @Bean
    public PlatformTransactionManager transactionManager(EntityManagerFactory emf) {
        return new JpaTransactionManager(emf);
    }
}
