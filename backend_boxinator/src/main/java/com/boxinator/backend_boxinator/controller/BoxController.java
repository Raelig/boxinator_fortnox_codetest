package com.boxinator.backend_boxinator.controller;

import com.boxinator.backend_boxinator.model.Box;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.*;
import java.util.*;

@CrossOrigin("*")
@RestController
public class BoxController {

    private String connectionURL = "jdbc:mysql://localhost:3306/sql_boxes";
    private String username = "root";
    private String password = "admin";

    private static final String sqlQueryCreateBox = "INSERT INTO Boxes(name, weight, colour, country, shipping_cost) VALUES (?, ?, ?, ?, ?)";
    private static final String sqlQuerySelectAll = "SELECT * FROM boxes";


    @GetMapping("/getAll")
    public ResponseEntity<?> getAllBoxes() {

        List<Box> boxResultList = new LinkedList<>();

        try (Connection connection = DriverManager.getConnection(connectionURL, username, password);
             PreparedStatement preparedStatement = connection.prepareStatement(sqlQuerySelectAll);
             ResultSet result  = preparedStatement.executeQuery()) {



            while (result.next()) {
                Box currentBox = new Box();
                currentBox.setId(result.getLong("box_id"));
                currentBox.setBoxName(result.getString("name"));
                currentBox.setBoxWeight(result.getInt("weight"));
                currentBox.setBoxColour(result.getString("colour"));
                currentBox.setBoxCountry(result.getString("country"));
                currentBox.setShippingCost(result.getDouble("shipping_cost"));

                boxResultList.add(currentBox);
            }

        }  catch (SQLException e) {
            System.err.format("SQL State: %s\n%s", e.getSQLState(), e.getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    return new ResponseEntity<>(boxResultList, HttpStatus.ACCEPTED);

    }

    @PostMapping(value = "/createBox", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public ResponseEntity createBox(@RequestBody Box box) {

        System.out.println(box.getClass());
        System.out.println("BOX: " + box);

        box.setShippingCost();
        ResultSet result;

        try (Connection connection = DriverManager.getConnection(connectionURL, username, password);
             PreparedStatement preparedStatement = connection.prepareStatement(sqlQueryCreateBox)) {

            preparedStatement.setString(1, box.getBoxName());
            preparedStatement.setInt(2, box.getBoxWeight());
            preparedStatement.setString(3, box.getBoxColour());
            preparedStatement.setString(4, box.getBoxCountry());
            preparedStatement.setDouble(5, box.getShippingCost());

            System.out.println(preparedStatement);
            preparedStatement.executeUpdate();

            System.out.println("after prep statement");



        } catch (SQLException e) {
            System.err.format("SQL State: %s\n%s", e.getSQLState(), e.getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }


        return new ResponseEntity(HttpStatus.ACCEPTED);
    }

}
