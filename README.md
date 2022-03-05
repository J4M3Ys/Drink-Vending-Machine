# Drink Vending Machine
This is testing project for SCG By Charakorn Purithewes. ( James )

# Feature
> ทั้งหมดประกอบได้ด้วย 3 ส่วน ได้แก้ API, WEB, CMS ( ไม่ Support responsive )

API

```bash
# Docker compose ( MongoDB )
docker-compose up -d

# install package and Start server
npm i && npm start
```

* Api authorization ( Token ) Login เพื่อรับ Token.
* CRUD Drink Vending Machine.
* CRUD Product in Drink Vending Machine.
* Upload image.
* Notification สำหรับสินค้าที่น้อยกว่า 10 ชิ้น ( แจ้งเตือนไปทุก Account ที่เป็น Role admin ).
* Api สำหรับการซื้อสินค้า.

CMS

```bash
# install package and Start server
yarn && yarn start
```

* ระบบสมัครสมาชิกสำหรับใช้ในการ Login เข้าใช้งาน CMS. ( Default role จะเป็น Admin ).
<div style="display: flex;">
  <img src="https://user-images.githubusercontent.com/101004644/156893725-fac625b6-67fc-45ea-8fbf-41a673db20ed.png" width="200px;">
</div>

* ระบบ Login เพื่อเข้าใช้งาน CMS.
<div style="display: flex;">
  <img src="https://user-images.githubusercontent.com/101004644/156893730-f6e9241b-d196-442e-91d3-71fe659e311b.png" width="200px;">
</div>

* ตารางแสดง Drink Vending Machine ที่มีทั้งหมดในระบบ และเมนู สร้าง, ลบ, แก้ไข และค้นหา. 
<div style="display: flex;">
  <img src="https://user-images.githubusercontent.com/101004644/156894022-364c2466-a782-40b6-b9f0-6b946c88e55a.png" width="700px;">
</div>

* สามารถสร้าง, ลบ, แก้ไข, ค้นหา Drink Vending Machine และระบุตำแหน่งของตู้ในแผนที่ได้
<div style="display: flex;">
  <img src="https://user-images.githubusercontent.com/101004644/156894018-e2352e90-7354-4fd1-8c7a-d12c81109ba2.png" width="400px;">
  <img src="https://user-images.githubusercontent.com/101004644/156894021-b156ef1e-ac0d-49c2-b35f-f12dde67a7c4.png" width="500px;">
</div>
* ตารางแสดงสินค้าภายใน Drink Vending Machine ที่เลือกผ่านเมนู  View Product และเมนู สร้าง, ลบ, แก้ไข และค้นหา.
<div style="display: flex;">
  <img src="https://user-images.githubusercontent.com/101004644/156894257-f5ae808d-15a7-477d-9838-3c98e0862ab7.png" width="700px;">
</div>

* สามารถสร้าง, ลบ, แก้ไข, ค้นหา สินค้าใน Drink Vending Machine ที่เราทำการสร้างขึ้นมา.
<div style="display: flex;">
  <img src="https://user-images.githubusercontent.com/101004644/156894364-7f69b1db-58a9-41e4-8ede-464255fa911f.png" width="400px;">
</div>

* สามารถดูตำแหน่งที่ตั้งของ Drink Vending Machine ในแผนที่ได้ว่าตั้งอยู่ที่ใดบ้าง โดยคลิกเลือกที่ตู้ และแผนที่จะทำการ ชี้ไปที่ Location ของตู้บนแผนที่.
* ระบบ Notification สำหรับสินค้าใดๆ ที่มีจำนวนคงเหลือในตู้ น้อยกว่า 10 ชิ้น. ( แจ้งเตือนไปทุก Account ที่เป็น Role admin )



WEB

```bash
# install package and Start server
yarn && yarn run dev
```

* แสดง และค้นหา Drink Vending Machine ที่ต้องการใช้งาน.
<div style="display: flex;">
  <img src="https://user-images.githubusercontent.com/101004644/156893353-ff51cdee-7b52-471c-a5b3-9c559c6759a7.png" width="700px;">
</div>

* ค้นหา และซื้อสินค้าใน Drink Vending Machine ที่เลือกใช้งาน แสดงจำนวนคงเหลือของสินค้า หากสินค้าหมดจะเป็น Sold out.
<div style="display: flex;">
  <img src="https://user-images.githubusercontent.com/101004644/156893543-9d360997-d9a2-4b30-b64f-8d740efa6a44.png" width="500px;">
  <img src="https://user-images.githubusercontent.com/101004644/156893606-0e1acfe4-8a12-4e6b-8d74-10948c96493b.png" width="500px;">
</div>

# Stack
* React Js ( CMS )
* Next Js ( WEB )
* Node Js + Express Js ( API )
* MongoDB + MongoDB Compass
* Docker
* Antd


