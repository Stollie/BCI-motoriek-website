<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of exercise
 *
 * @author Remco
 */
class Exercises_Controller extends Base_Controller {
    //put your code here

    public $restful = true;
 
    public function get_index($id = null)
    {
        if (is_null($id )) {
            return Response::eloquent(Exercise::all());
        }
        else {
            $exercise = Exercise::find($id);
 
            if(is_null($exercise)){
                return Response::json('Log not found', 404);
            } else {
                    return Response::eloquent($exercise);
            }
        }
    }
 
    public function post_index()
    {
        // Json ophalen
        $newexercise = Input::json();
        // Exercise maken
        $exercise = new Exercise();
        $exercise->name = $newexercise->name;
        $exercise->save();
        // Motionlogs van Exercise van opslaan
        $exercise->motionlogs()->save($this->_toArray($newexercise->motionlogs));
        return Response::eloquent($exercise);
    }
 
    public function put_index()
    {
        $update = Input::json();
 
        $exercise = Exercise::find($update->id);
        if(is_null($exercise)){
            return Response::json('Log not found', 404);
        }
        $exercise->name = $update->name;
        $exercise->save();
        return Response::eloquent($exercise);
    }
 
    public function delete_index($id = null)
    {
        $exercise = Exercise::find($id);
 
        if(is_null($exercise))
        {
             return Response::json('Log not found', 404);
        }
        $deleted = $exercise;
        $exercise->delete();    
        return Response::eloquent($deleted);  
    } 

    private function _toArray($obj) {
        if(is_object($obj)) $obj = (array) $obj;
        if(is_array($obj)) {
          $new = array();
          foreach($obj as $key => $val) {
            $new[$key] = $this->_toArray($val);
          }
        }
        else { 
          $new = $obj;
        }
        return $new;
    }
}

?>
