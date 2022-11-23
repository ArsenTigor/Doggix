<?php
    require_once("action/DAO/Connection.php");

    class CardDAO{

        public static function getData(){
            $connection = Connection::getConnection();
            $statement = $connection ->prepare("SELECT * FROM card_data");
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();

            return $statement->fetchAll();
        }

           
        public static function addCardPlayed($cardid)  {

            $connection = Connection::getConnection();
            $statement = $connection->prepare("INSERT INTO card_data(id, cardid)
                                                VALUES (DEFAULT, ?);");
            $statement->bindParam(1, $cardid);
            $statement->execute();
        }
    }
    