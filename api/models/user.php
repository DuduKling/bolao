<?php
class UserModel
{
    public $table = 'user';

    public $id;
    public $name;
    public $phoneNumber;
    private $passwd;
    public $salt;
    public $role;
    private $createdAt;
    private $updatedAt;
}
