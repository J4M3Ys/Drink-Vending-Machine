# Drink Vending Machine
This is testing project for SCG By Charakorn Purithewes. ( James )

# Feature
> ทั้งหมดประกอบได้ด้วย 3 ส่วน ได้แก้ API, WEB, CMS ( ไม่ Support responsive )

API
* Api authorization ( Token ) Login เพื่อรับ Token.
* CRUD Drink Vending Machine.
* CRUD Product in Drink Vending Machine.
* Upload image.
* Notification สำหรับสินค้าที่น้อยกว่า 10 ชิ้น ( แจ้งเตือนไปทุก Account ที่เป็น Role admin ).
* Api สำหรับการซื้อสินค้า.

CMS
* ระบบสมัครสมาชิกสำหรับใช้ในการ Login เข้าใช้งาน CMS. ( Default role จะเป็น Admin ).
* ระบบ Login เพื่อเข้าใช้งาน CMS.
* สามารถสร้าง, ลบ, แก้ไข, ค้นหา Drink Vending Machine ได้. ( ระบุตำแหน่งของตู้ในแผนที่ได้ )
* สามารถสร้าง, ลบ, แก้ไข, ค้นหา สินค้าใน Drink Vending Machine ที่เราทำการสร้างขึ้นมา.
* สามารถดูตำแหน่งที่ตั้งของ Drink Vending Machine ในแผนที่ได้ว่าตั้งอยู่ที่ใดบ้าง โดยคลิกเลือกที่ตู้ และแผนที่จะทำการ ชี้ไปที่ Location ของตู้บนแผนที่.
* ระบบ Notification สำหรับสินค้าใดๆ ที่มีจำนวนคงเหลือในตู้ น้อยกว่า 10 ชิ้น. ( แจ้งเตือนไปทุก Account ที่เป็น Role admin )

WEB
* แสดง และค้นหา Drink Vending Machine ที่ต้องการใช้งาน.
* ค้นหา และซื้อสินค้าใน Drink Vending Machine ที่เลือกใช้งาน 
* แสดงจำนวนคงเหลือของสินค้า หากสินค้าหมดจะเป็น Sold out.

# Stack
* React Js ( CMS )
* Next Js ( WEB )
* Node Js + Express Js ( API )
* MongoDB
* Docker
* Antd

