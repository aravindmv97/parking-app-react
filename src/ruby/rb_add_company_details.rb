require 'mysql2' 
require 'mysql2-cs-bind'

con = Mysql2::Client.new(:host => "localhost", :username => "phpmyadmin", :password=> "12345", :database => "parking")

input_array = ARGV
puts input_array
c_name = input_array[0] 
t_name = input_array[1]
c_space = input_array[2]
b_space = input_array[3]
id = input_array[4]
type = input_array[5]


if type=="add"
	query1 = con.xquery("INSERT INTO company_details (company_name, tower_name, car_space,bike_space,car_slot,bike_slot)		
		VALUES (?,?,?,?,?,?)",c_name,t_name,c_space,b_space,0,0)

		puts query1
end

if type =="save"
	 query2 = con.xquery("UPDATE company_details SET company_name = ?,tower_name = ?,car_space = ?,bike_space = ? WHERE id = ?;",c_name,t_name,c_space,b_space,id)
end

if type == "delete"
	query3 = con.xquery("DELETE FROM company_details WHERE id = ?",id)

end