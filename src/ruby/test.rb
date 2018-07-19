require 'mysql2' 
require 'mysql2-cs-bind'
require 'sinatra'
require 'sinatra/cross_origin'
require 'json'

register Sinatra::CrossOrigin
configure do
  enable :cross_origin
end
con = Mysql2::Client.new(:host => "localhost", :username => "phpmyadmin", :password=> "12345", :database => "parking")


get '/:type/:company_name/:tower_name/:car_space/:bike_space/:id/:vtype/:vnumber/:slotnumber' do
result_array = Array.new
arr =[]

 type = params[:type]
 c_name = params[:company_name]
 t_name = params[:tower_name]
 c_space = params[:car_space]
 b_space = params[:bike_space]
 vtype = params[:v_type]
vnumber = params[:v_number]
snumber = params[:slot_number]
 c_id = params[:id]
 index=0
case type
when "show_company_details"
	query1 = con.xquery("SELECT * FROM company_details")
	 query1.each do |row|
 	result_array[index] = row
 	index+=1
 end
when "show_company_details_name"
	query1 = con.xquery("SELECT * FROM company_details WHERE company_name=?",c_name)
	 query1.each do |row|
 	result_array[index] = row
 	index+=1
 end
when "show_park_details"
	query1 = con.xquery("SELECT * FROM park_details")
	 query1.each do |row|
 	result_array[index] = row
 	index+=1
 end
when "add_company_details"
	query2 = con.xquery("INSERT INTO company_details (company_name, tower_name, car_space,bike_space,car_slot,bike_slot)		
		VALUES (?,?,?,?,?,?)",c_name,t_name,c_space,b_space,0,0) 
when "update_company_details"
	query2 = con.xquery("UPDATE company_details SET company_name = ?,tower_name = ?,car_space = ?,bike_space = ? WHERE id = ?;",c_name,t_name,c_space,b_space,c_id)
when "delete_company_details"
	query2 = con.xquery("DELETE FROM company_details WHERE id = ?",c_id)
when "delete_parking_details"
	query2 = con.xquery("DELETE FROM park_details WHERE id = ?",c_id)
when "add_parking_details"
	query1 = con.xquery("INSERT INTO park_details (v_type, v_number, company_name,slot_number,upload_date)		
		VALUES (?,?,?,?,?)",vtype,t_vnumber,cname,snumber,0)
	query1.each do |row|
 	result_array[index] = row
 	index+=1
	end
else
end
 
	

 arr.push("results"=>result_array).to_json
end


