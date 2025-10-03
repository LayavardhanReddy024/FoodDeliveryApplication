package delivery;

import jakarta.servlet.ServletContextEvent;
import jakarta.servlet.ServletContextListener;
import jakarta.servlet.annotation.WebListener;
import java.sql.DriverManager;
import com.mysql.cj.jdbc.AbandonedConnectionCleanupThread;
@WebListener
public class AppContextListener implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        // No action needed on initialization
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        try {
            // Deregister JDBC drivers
            DriverManager.deregisterDriver(DriverManager.getDriver("jdbc:mysql://localhost:3306/yourdb"));
            // Stop abandoned connection cleanup thread
            AbandonedConnectionCleanupThread.checkedShutdown();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

