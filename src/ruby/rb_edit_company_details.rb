require 'mysql2' 
require 'mysql2-cs-bind'
require 'sinatra'
require 'sinatra/cross_origin'
require 'json'

register Sinatra::CrossOrigin
configure do
  enable :cross_origin
end

input_array =[]
input_array = ARGV
name = input_array[0]

con = Mysql2::Client.new(:host => "localhost", :username => "phpmyadmin", :password=> "12345", :database => "parking")

sth = con.xquery("SELECT * FROM company_details WHERE company_name= ?",name)

result_array = Array.new
index=0
arr = Array.new
puts sth.each
sth.each do |row|
	result_array[index] = row
	index+=1
end
arr.push("results"=>result_array)
puts arr
get '/' do
 arr.to_json
end