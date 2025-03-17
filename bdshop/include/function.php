<?php
function hsc($value){
    return is_null($value)?"": htmlspecialchars($value);
}