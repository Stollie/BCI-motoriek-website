<?php
class Motionlogs_Controller extends Base_Controller {

    public $restful = true;
 
    public function get_index($id = null)
    {
        if (is_null($id ))
        {
            // Eindelijk goed.
            return json_encode(array('motionlogs' => json_decode(Response::eloquent(MotionLog::all()))));
        }
        else
        {
            $log = MotionLog::find($id);
 
            if(is_null($log)){
                return Response::json('Log not found', 404);
            } else {
                return json_encode(array('motionlogs' => json_decode(Response::eloquent($log))));
            }
        }
    }
 
    public function post_index()
    {
        $newlog = Input::json();
 
        $log = new MotionLog();
        $log->xyz = $newlog->xyz;
        $log->save();
 
        return Response::eloquent($log);
    }
 
    public function put_index()
    {
        $update = Input::json();
 
        $log = MotionLog::find($update->id);
        if(is_null($log)){
            return Response::json('Log not found', 404);
        }
        $log->xyz = $update->xyz;
        $log->save();
        return Response::eloquent($log);
    }
 
    public function delete_index($id = null)
    {
        $log = MotionLog::find($id);
 
        if(is_null($log))
        {
             return Response::json('Log not found', 404);
        }
        $deleted = $log;
        $log->delete();    
        return Response::eloquent($deleted);  
    } 

}
