<?php
class Exercise_listings_Controller extends Base_Controller {
 
    public $restful = true;

    public function get_index()
    {
        return Response::json(array('exercise_listings' => json_decode(Response::eloquent(Exercise::all()))));
    }
}