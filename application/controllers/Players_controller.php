<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/***************************************************************************
 * Headers to allow access
****************************************************************************/
header('Access-Control-Allow-Origin: *');
if($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
  header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
	$method = $_SERVER['REQUEST_METHOD'];
  if($method == "OPTIONS") {
      die();
  }
}
/***************************************************************************/


/***************************************************************************
 * RESTful library
****************************************************************************/
require(APPPATH . 'libraries/REST_Controller.php');
require(APPPATH . 'libraries/Format.php');
/***************************************************************************/


/***************************************************************************
 * Players controller
****************************************************************************/
class Players_controller extends Restserver\Libraries\REST_Controller {

  /**
   * Initiate parent class construct
   * Load Players model
   */
  function __construct()
  {
    parent::__construct();
    $this->load->model('players_model', 'PMOD');
  }

  /**
   * Get a list of all players
   */
  public function upload_players_post()
  {
    $file = $this->post();
    $response = $this->PMOD->UploadPlayers($file);
    return $this->response($response);
  }
  
  /**
   * Get a player by ID
   */
  public function players_get()
  {
    $response = $this->PMOD->GetAllPlayers();
    return $this->response($response);
  }
  
  /**
   * Get a player by ID
   */
  public function player_get($id)
  {
    $response = $this->PMOD->GetPlayerById($id);
    return $this->response($response);
  }
  
  /**
   * Get a player by ID, eg. https:// ... .com/players_controller_delete_player/{ID}
   */
  public function delete_player_delete($id)
  {
    $response = $this->PMOD->DeletePlayerById($id);
    return $this->response($response);
  }
}
