require 'mysql2' 
require 'mysql2-cs-bind'



con = Mysql2::Client.new(:host => "localhost", :username => "phpmyadmin", :password=> "12345", :database => "parking")

input_array = ARGV
puts input_array
name = input_array[0]

sth = con.xquery("SELECT * FROM company_details WHERE company_name=?",name)

puts sth.count

result_array = Array.new
index=0
arr = Array.new

sth.each do |row|
	result_array[index] = row
	index+=1
		 end
arr.push("results"=>result_array)

puts arr


