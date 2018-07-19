require 'mysql2'
require 'mysql2-cs-bind'


con = Mysql2::Client.new(:host => "localhost", :username => "phpmyadmin",:password => "12345",:database => "parking")

sth = con.xquery("SELECT * FROM park_details ORDER BY id DESC ")

result_array = Array.new
arr = Array.new
index=0

sth.each do |row|
	result_array[index] = row
	index+=1
end

arr.push("results"=>result_array)

puts arr