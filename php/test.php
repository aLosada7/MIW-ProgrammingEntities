<?php

class Test extends PHPUnit_Framework_TestCase
{
    function test_create_class() {
    }
    public function testPar4() {
        // Assert par 4
        $a = new ParFact();
        $this->assertEquals(true, $a->par(4));
    }

}