<?php
class UserModel
{
    public $table = 'user';

    private $id;
    public $uuid;
    public $name;
    public $phoneNumber;
    private $passwd;
    public $salt;
    public $role;
    private $createdAt;
    private $updatedAt;
}
