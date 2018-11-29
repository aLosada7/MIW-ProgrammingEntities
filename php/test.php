<?php
use PHPUnit\Framework\TestCase;
require_once './controller.php';
  
class test extends TestCase
{
    function test_create_class() {
        $res=new Operaciones();
        $this->assertTrue(is_a($res, 'Operaciones'));
    }
    public function test1() {
        // Assert par 4
        $a = new ParFact();
        $this->assertEquals(true, $a->par(4));
    }
}

?>