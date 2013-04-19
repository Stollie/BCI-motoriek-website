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
        if (is_null($id ))
        {
            return Response::eloquent(Exercise::all());
        }
        else
        {
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
//        $newexercise = Input::json();
//        print_r($newexercise->exercise->motionlogs);
//        $exercise = new Exercise();
//        $exercise->name = $newexercise->name;
//        $exercise->save();
// 
//        $exercise->motionlogs()->insert($newexercise->motionlogs);
//        return Response::eloquent($exercise);
        
        $newexercise = Input::json();
        $exercise = new Exercise();
        $exercise->name = $newexercise->name;
        $exercise->save();
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

}

?>
