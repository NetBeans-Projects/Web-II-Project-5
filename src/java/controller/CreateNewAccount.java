package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.User;

@WebServlet(name = "CreateNewAccount", urlPatterns = {"/CreateNewAccount"})
public class CreateNewAccount extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        response.addHeader("Access-Control-Allow-Origin", "*");

        // Json -> Java
        Gson gson = new Gson();
//        User user = gson.fromJson(request.getReader(), User.class); // our bean for json object data store
        JsonObject user = gson.fromJson(request.getReader(), JsonObject.class); //JsonObject

//        System.out.println(user.getMobile());
//        System.out.println(user.getFirstName());
//        System.out.println(user.getLastName());
//        System.out.println(user.getPassword());
//        System.out.println(user.getCountry());
        try {

            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection c = DriverManager.getConnection("jdbc:mysql://localhost:3306/web_5?useSSL=false", "root", "Judemysql@2004");
            Statement s = c.createStatement();

//            Using "User" Java Bean Query
//            s.executeUpdate("INSERT INTO "
//                    + "`user` (`mobile`,`first_name`,`last_name`,`password`,`country`) "
//                    + "VALUES('" + user.getMobile() + "','" + user.getFirstName() + "','" + user.getLastName() + "','" + user.getPassword() + "','" + user.getCountry() + "')");

//            JsonObject Query
            s.executeUpdate("INSERT INTO "
                    + "`user` (`mobile`,`first_name`,`last_name`,`password`,`country`) "
                    + "VALUES('" + user.get("mobile").getAsString() + "','" + user.get("firstName").getAsString() + "','" + user.get("lastName").getAsString() + "','" + user.get("password").getAsString() + "','" + user.get("country").getAsString() + "')");

            response.getWriter().write("Success");

        } catch (Exception e) {

            e.printStackTrace();

        }

        response.getWriter().write("Hello");

    }

}
