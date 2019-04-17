<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Players_model extends CI_Model {

  /***
   * Players_model
   * 
      Methods:
        1. Upload a .json file of the structure (An array of objects):
        2. View all players.
        3. View a player specified by ID.
        4. Delete a player by specified by ID
  */
  
  public function generateRandomString($length = 5) {
    return substr(
      str_shuffle(
        str_repeat(
          $x='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 
          ceil($length/strlen($x)) 
        )
      ), 1 , $length);
  }

  /**
   * Public method: Upload a list of players 
      {
        "Players": [
          {
            "Name": <string>,
            "Age": <int>,
            "Location": {
              "City": <string>,
              "Province": <string>,
              "Country": <string>
            }
          },
          {
            "Name": <string>,
            "Age": <int>,
            "Location": {
              "City": <string>,
              "Province": <string>,
              "Country": <string>
            }
          }
          ...
        ]
      }
   */
  public function UploadPlayers( $contents )
  {
    foreach($contents["Players"] as $Player)
    {
      /* Iteratively check for a new unique ID */
      $num_rows = 100;
      $testId = NULL;
      while($num_rows != 0)
      {
        $testId = $this->generateRandomString(5);
        $this->db->select("*");
        $this->db->from('primary_info');
        $this->db->where('primary_info.ID=', $testId);
        $query = $this->db->get();
        $num_rows = $query->num_rows();
      }

      $this->db->trans_start();
  
      $primData = array(
        "ID"=> $testId,
        "Name"=> $Player["Name"],
        "Age"=> $Player["Age"]
      );
      $this->db->insert('primary_info', $primData); 

      // $id = $this->db->insert_id(); 
  
      $addData = array(
        "ID"=> $testId,
        "City"=> $Player["Location"]["City"],
        "Province"=> $Player["Location"]["Province"],
        "Country"=> $Player["Location"]["Country"]
      );
      $this->db->insert('additional_info', $addData);
  
      $this->db->trans_complete(); 
  
    }
    
    return $testId;
  }

  /**
   * Public method: Get a list of all players  
  **/
  public function GetAllPlayers( )
  {
    $players = array();

    /**
     * Query: 
     *  SELECT * FROM 
     *    primary_info AS prim
     *  INNER JOIN 
     *    additional_info AS addi
     *  ON prim.ID = addi.ID
     */
    $this->db->select('*');
    $this->db->from('primary_info AS prim');
    $this->db->join('additional_info AS addi', 'prim.ID = addi.ID', 'INNER'); 
    $query = $this->db->get();

    /**
     * If no rows exist -> return empty array
     */
    if (count($query->result()) == 0)
      return $players;

    /**
     * Format each result and push to list of results
     */
    foreach($query->result() as $row)
    {
      $player = array(
        "ID"=> $row->ID,
        "Name"=> $row->Name,
        "Age"=> $row->Age,
        "Location"=> array(
          "City"=> $row->City,
          "Province"=> $row->Province,
          "Country"=> $row->Country
        )
      );
      array_push($players, $player);
    }

    return array("Players" => $players);
  }

  /**
   * Public method: Get a single player by ID
  **/
  public function GetPlayerById( $id=NULL )
  {
    $player = new stdClass;

    if (!$id)
      return $player;

    $this->db->select("*");
    $this->db->from('primary_info AS prim');
    $this->db->join('additional_info AS addi', 'prim.ID = addi.ID', 'INNER'); 
    $this->db->where('prim.ID=' . $id);
    $query = $this->db->get();

    if ($query->num_rows() == 0)
      return $player;

    $row = $query->row();
    $player = array(
      "ID"=> $row->ID,
      "Name"=> $row->Name,
      "Age"=> $row->Age,
      "Location"=> array(
        "City"=> $row->City,
        "Province"=> $row->Province,
        "Country"=> $row->Country
      )
    );

    return array("Player"=> $player);
  }

  /**
   * Public method: Delete player matching provided ID
  **/
  public function DeletePlayerById( $id=NULL )
  {
    if (!$id)
      return FALSE;

    /**
     * Check if row exists
     */
    $this->db->select("*");
    $this->db->from('primary_info AS prim');  /* primary_info holds priary key, additional info holds foreign key */
    $this->db->where('prim.ID', $id);
    $query = $this->db->get();

    /**
     * If user with specified ID does not exist
     */
    if ($query->num_rows() == 0)
      return FALSE;

    /**
     * If user with specified ID exists, delete row
     */
    $this->db->where("ID", $id);
    $this->db->delete('primary_info');
    return TRUE;
  }


}