require 'mysql2' 
require 'sinatra'
require 'mysql2-cs-bind'
require 'sinatra/cross_origin'
require 'json'

register Sinatra::CrossOrigin
configure do
  enable :cross_origin
end
con = Mysql2::Client.new(:host => "localhost", :username => "phpmyadmin", :password=> "12345", :database => "parking")

input_array = ARGV
puts input_array

sth = con.query("SELECT * FROM company_details")

puts sth.count

result_array = Array.new
index=0
arr = Array.new

sth.each do |row|
	result_array[index] = row
	index+=1
		 end
arr.push("results"=>result_array)

get '/' do
 arr.to_json
end
