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

```bash
# Docker compose ( MongoDB )
docker-compose up -d

# install package and Start server
npm i && npm start
```

CMS
* ระบบสมัครสมาชิกสำหรับใช้ในการ Login เข้าใช้งาน CMS. ( Default role จะเป็น Admin ).
* ระบบ Login เพื่อเข้าใช้งาน CMS.
* สามารถสร้าง, ลบ, แก้ไข, ค้นหา Drink Vending Machine ได้. ( ระบุตำแหน่งของตู้ในแผนที่ได้ )
* สามารถสร้าง, ลบ, แก้ไข, ค้นหา สินค้าใน Drink Vending Machine ที่เราทำการสร้างขึ้นมา.
* สามารถดูตำแหน่งที่ตั้งของ Drink Vending Machine ในแผนที่ได้ว่าตั้งอยู่ที่ใดบ้าง โดยคลิกเลือกที่ตู้ และแผนที่จะทำการ ชี้ไปที่ Location ของตู้บนแผนที่.
* ระบบ Notification สำหรับสินค้าใดๆ ที่มีจำนวนคงเหลือในตู้ น้อยกว่า 10 ชิ้น. ( แจ้งเตือนไปทุก Account ที่เป็น Role admin )

```bash
# install package and Start server
yarn && yarn start
```

WEB
* แสดง และค้นหา Drink Vending Machine ที่ต้องการใช้งาน.
<div style="display: flex;">
  <img src="https://user-images.githubusercontent.com/101004644/156893353-ff51cdee-7b52-471c-a5b3-9c559c6759a7.png" width="600px;">
</div>
* ค้นหา และซื้อสินค้าใน Drink Vending Machine ที่เลือกใช้งาน แสดงจำนวนคงเหลือของสินค้า หากสินค้าหมดจะเป็น Sold out.
<div style="display: flex;">
  <img src="https://user-images.githubusercontent.com/101004644/156893519-c65f3b4e-e578-40bd-b8e8-d13bee61f406.png" width="500px;">
</div>
```bash
# install package and Start server
yarn && yarn run dev
```

# Stack
* React Js ( CMS )
* Next Js ( WEB )
* Node Js + Express Js ( API )
* MongoDB
* Docker
* Antd

