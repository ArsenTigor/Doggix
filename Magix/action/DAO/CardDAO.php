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

        public static function getDataCountOrdered(){
            $connection = Connection::getConnection();
            $statement = $connection -> prepare("SELECT cardid, count(*) FROM card_data GROUP BY cardid ORDER BY count(*) DESC");
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();
            
            return $statement->fetchAll();
        }

        public static function getTotalData(){
            $connection = Connection::getConnection();
            $statement = $connection ->prepare("SELECT COUNT(*) FROM card_data");
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();

            return $statement->fetchAll();
        }

        public static function resetTable(){
            $connection = Connection::getConnection();
            $statement = $connection->prepare("DROP TABLE IF EXISTS card_data");
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();

        }

        public static function createTable(){
            $connection = Connection::getConnection();
            $statement = $connection->prepare("CREATE TABLE card_data( id SERIAL PRIMARY KEY, cardid INT)");
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();
        }

    }
    