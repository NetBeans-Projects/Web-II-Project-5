package controller;

import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.User;

@WebServlet(name = "Login", urlPatterns = {"/login"})
public class Login extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        response.setHeader("Access-Control-Allow-Origin", "*");

        Gson gson = new Gson();
        User u = gson.fromJson(request.getReader(), User.class);

        try {

            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/web_5?useSSL=false",
                    "root",
                    "Password");
            Statement smt = connection.createStatement();

            ResultSet rs = smt.executeQuery("SELECT * FROM `user` WHERE `mobile`='" + u.getMobile() + "' && "
                    + "`password` = '" + u.getPassword() + "'");
            
            if (rs.next()) {
                
                User u1 = new User();
                u1.setFirstName(rs.getString("first_name"));
                u1.setLastName(rs.getString("last_name"));
                u1.setMobile(rs.getString("mobile"));
                u1.setCountry(rs.getString("country"));
                
                request.getSession().setAttribute("user", u1);
                response.getWriter().write("Success");
                
            }

        } catch (ClassNotFoundException | SQLException e) {

            e.printStackTrace();
            response.getWriter().write("login failed.");

        }

    }

}
