<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Auth;

class Permission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */

    public function handle($request, Closure $next)
    {
        //return response()->json(['success' => 1]);//test 代码
        
        $permission_vue = $request->header('permissionvue');
        $user = Auth::user();
        $mem_perkey = 'user'.$user->email.'permission';
        $permission_mem = Cache::get($mem_perkey);
        /*var_dump($permission_vue);
        echo "OK";
        var_dump($permission_mem);*/
        if($permission_mem === $permission_vue){
            return $next($request);
        }else{
            echo json_encode(array('error'=>'permission not verify'),401);
            die(); 
        }
        //$permission_vue = $request->permission_vue
    }
}
