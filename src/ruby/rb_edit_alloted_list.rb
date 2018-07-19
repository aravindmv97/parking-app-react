require 'mysql2'
require 'mysql2-cs-bind' 
require 'sinatra'
require 'sinatra/cross_origin'
require 'json'

input_array = []
input_array = ARGV
id = input_array[0]

con = Mysql2::Client.new(:host => "localhost", :username=> "phpmyadmin",:password=>'12345',:database=>'parking')

sth = con.xquery("DELETE FROM park_details WHERE id = ?",id)


get '/' do
 'done!'
end