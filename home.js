// Khai báo một biến toàn cục có nhiệm vụ kiểm tra chỉ số dòng cần update;
let count_update = 0;

let staffs = [
	{
		MaNS: "AT170643",
		HoTen: "Nguyễn Đình Sinh",
		Tuoi: 19,
		NgaySinh: "03/07/2002",
		GioiTinh: "Nam",
		ChucVu: 'Chủ tịch',
	},{
		MaNS: "AT170633",
		HoTen: "Tống Xuân Mạnh",
		Tuoi: 19,
		NgaySinh: "01/01/2002",
		GioiTinh: "Nam",
		ChucVu: 'Giám đốc',
	},{
		MaNS: "AT170630",
		HoTen: "Lê Ngọc Long",
		Tuoi: 19,
		NgaySinh: "02/02/2002",
		GioiTinh: "Nam",
		ChucVu: 'Thư ký',
	},{
		MaNS: "AT170638",
		HoTen: "Trần Ngọc Phú",
		Tuoi: 19,
		NgaySinh: "03/03/2002",
		GioiTinh: "Nam",
		ChucVu: 'Doanh nhân',
	},
];
//khai báo hàm genStaffTable: mục đích để vẽ ra các thẻ HTML để hiển thị bên trong thẻ tbody có ID=staffTbody
let genStaffTable = function () {
	//đoạn lệnh này xóa toàn bộ các thẻ con bên trong thẻ tbody có id là staffTbody
	const myNode = document.getElementById("staffTbody");
	myNode.innerHTML = "";

	//shorthand: đoạn này kiểm tra nếu mảng staffs != null && staff != undefined
	if (staffs) {
		//dùng thể lưu html của các row trong table Staff
		let rowItems = "";

		//vòng lặp
		for (let i = 0; i < staffs.length; i++) {
			let staff = staffs[i]; // lấy ra staff cụ thể trong mảng staffs
			let rowItem = `<tr>
				<td>${staff.MaNS}</td>
				<td>${staff.HoTen}</td>
				<td>${staff.Tuoi}</td>
				<td>${staff.NgaySinh}</td>
				<td>${staff.GioiTinh}</td>
				<td>${staff.ChucVu}</td>
				<td class="del_edit">
				  	<input class="delete form-control_me" type='button' value='Xóa' onclick='xoaHocSinh("${staff.MaNS}");' />
				  	<input class="edit form-control_me" type='button' value='Sửa' onclick='suaHocSinh("${staff.MaNS}");' />
				</td>
				</tr>`;
			//thêm 1 row vào trong rowItems: nó chính là cách viết: rowItems = rowItems + rowItem
			rowItems += rowItem;
		}

		myNode.innerHTML = rowItems;
	}
};

//goi ham để gen ra màn hình các thông tin của sinh viên
genStaffTable();

let LuuNhanVien = function () {
	//đoạn này lấy giá trị trong form thêm mới học sinh

	// Tạo một biến gián tiếp để lấy ra giá trị thẻ input của biến lựa chọn
	// rồi ghi lại thuộc tính type = "checkbox" để hiện thẻ input

	let maNS = document.getElementById("txtMaNS").value;
	let hoTen = document.getElementById("txtHoTen").value;
	let tuoi = document.getElementById("txtTuoi").value;

	let ngaysinh = document.getElementById("txtDate").value;
	// Ở đây sau khi lấy được giá trị ngày nhập vào ta tách chuối thành các phần tử nhỏ bằng hàm split()
	// rồi đảo ngược thứ tự bằng hàm reverse() rồi chuyển vào hàm mới bằng join();
	ngaysinh = ngaysinh.split('-').reverse().join('-');
	// Sau đó ta thay thế kí tự '-' mặc định thành '/' bằng hàm replace() hoặc replaceAll();
	ngaysinh = ngaysinh.replace(/-/g, "/");

	// Khai báo một biến gioitinh trống;
	let gioitinh = "";
	// Khai báo biến check có giá trị là true hoặc false tùy vào giá trị mà người dùng chọn
	let check = document.getElementById("male").checked;
	if(check) {
		gioitinh = "Nam";
	}else {
		gioitinh = "Nữ";
	}

	let chucvu = document.getElementById("txtChucVu").value;

	//kiểm tra dữu liêu hợp lệ
	let isSinhVienHopLe = kiemTraDuLieuSinhVien(
		maNS,
		hoTen,
		tuoi,
		ngaysinh,
		gioitinh
	);
	if (isSinhVienHopLe) {
		let staff = {
			MaNS: maNS,
			HoTen: hoTen,
			Tuoi: tuoi,
			NgaySinh: ngaysinh,
			GioiTinh: gioitinh,
			ChucVu: chucvu,
		};

		staffs.push(staff);

		genStaffTable();

		//sau khi luu du lieu xong, clear form
		document.getElementById("newStaffForm").reset();
	}
};

//ham nay de kiem tra du lieu sinh vien hop le hay khong, neu hop le tra ve true, sai thi tra ve false
let kiemTraDuLieuSinhVien = function (maNS, hoTen, tuoi, ngaysinh, gioitinh) {
	let valid = false;

	if (maNS) {
		if (hoTen) {
			if (tuoi) {
				if(ngaysinh) {
					if (gioitinh) {
						valid = true;
					} else {
						alert("Giới tính không được để trống.");
					}
				}else {
					alert("Ngày sinh không được để trống.");
				}
			} else {
				alert("Tuổi không được để trống.");
			}
		} else {
			alert("Họ tên không được để trống.");
		}
	} else {
		alert("Mã NS không được để trống.");
	}

	return valid;
};

//hàm xóa sinh viên, truyền vào mã NS,
let xoaHocSinh = function (maNS) {

	//hàm confirm: bật lên thông báo xác nhận
	if(confirm(`Bạn có muốn xóa nhân sự ${maNS} không?`)) {

		for (var i = 0; i < staffs.length; i++) {
			let staff = staffs[i]; // lấy ra staff cụ thể trong mảng staffs

			//nếu mã sinh viên truyền vào, trùng với mã sinh viên trong mảng staffs, thì sẽ xóa sinh viên đó
			if(staff.MaNS.toUpperCase() == maNS.toUpperCase()) {
				staffs.splice(i,1);
			}
		}
		genStaffTable();
	}
}

let jobs = [];

function Checkjob() {
	let job = document.getElementById('job').value;
	jobs = staffs.filter(staff => staff.ChucVu  == job);
	genStaffTable_1();
}

let genStaffTable_1 = function () {
	//đoạn lệnh này xóa toàn bộ các thẻ con bên trong thẻ tbody có id là staffTbody
	const myNode = document.getElementById("staffTbody");
	myNode.innerHTML = "";

	//shorthand: đoạn này kiểm tra nếu mảng staffs != null && staff != undefined
	if (jobs) {
		//dùng thể lưu html của các row trong table Staff
		let rowItems = "";

		//vòng lặp
		for (let i = 0; i < jobs.length; i++) {
			let job = jobs[i]; // lấy ra staff cụ thể trong mảng staffs
			let rowItem = `<tr>
				<td>${job.MaNS}</td>
				<td>${job.HoTen}</td>
				<td>${job.Tuoi}</td>
				<td>${job.NgaySinh}</td>
				<td>${job.GioiTinh}</td>
				<td>${job.ChucVu}</td>
				<td class="del_edit">
				  	<input class="delete form-control_me" type='button' value='Xóa' onclick='xoaHocSinh("${job.MaNS}");' />
				  	<input class="edit form-control_me" type='button' value='Sửa' onclick='suaHocSinh("${job.MaNS}");' />
				</td>
				</tr>`;
			//thêm 1 row vào trong rowItems: nó chính là cách viết: rowItems = rowItems + rowItem
			rowItems += rowItem;
		}

		myNode.innerHTML = rowItems;
	}
};

function suaHocSinh(maNS) {

	//hàm confirm: bật lên thông báo xác nhận
	if(confirm(`Bạn có sửa nhân sự ${maNS} không?`)) {
		for (var i = 0; i < staffs.length; i++) {
			let staff = staffs[i]; // lấy ra staff cụ thể trong mảng staffs

			//nếu mã sinh viên truyền vào, trùng với mã sinh viên trong mảng staffs, thì sẽ xóa sinh viên đó
			if(staff.MaNS.toUpperCase() == maNS.toUpperCase()) {
				document.getElementById("txtMaNS").value = staff.MaNS;
				document.getElementById("txtHoTen").value = staff.HoTen;
				document.getElementById("txtTuoi").value = staff.Tuoi;
				document.getElementById("txtDate").value = staff.NgaySinh;
				document.getElementById("txtChucVu").value = staff.ChucVu;
				
				// Ban đầu nút Lưu hiện còn nút Update ta ẩn đi
				// Sau khi nhấn nút Sửa ta sẽ cho nút Lưu ẩn còn nút Update hiện ra
				document.getElementById("btnUpdate").type = "button";
				document.getElementById("btnSave").type = "hidden";

				count_update = i;
			}
		}
		genStaffTable();
	}
}



function UpdateNhanVien() {
	let maNS = document.getElementById("txtMaNS").value;
	let hoTen = document.getElementById("txtHoTen").value;
	let tuoi = document.getElementById("txtTuoi").value;
	let ngaysinh = document.getElementById("txtDate").value;
	ngaysinh = ngaysinh.split('-').reverse().join('-');
	ngaysinh = ngaysinh.replace(/-/g, "/");

	let gioitinh = "";
	let check = document.getElementById("male").checked;
	if(check) {
		gioitinh = "Nam";
	}else {
		gioitinh = "Nữ";
	}
	let chucvu = document.getElementById("txtChucVu").value;

	//kiểm tra dữu liêu hợp lệ
	let isSinhVienHopLe = kiemTraDuLieuSinhVien(
		maNS,
		hoTen,
		tuoi,
		ngaysinh,
		gioitinh
	);
	if (isSinhVienHopLe) {
		let staff = {
			MaNS: maNS,
			HoTen: hoTen,
			Tuoi: tuoi,
			NgaySinh: ngaysinh,
			GioiTinh: gioitinh,
			ChucVu: chucvu,
		};

		for (var i = 0; i < staffs.length; i++) {
			if(count_update == i) {
				staffs.splice(i, 1, staff);
				break;
			}
		}

		genStaffTable();

		//sau khi luu du lieu xong, clear form
		document.getElementById("newStaffForm").reset();

		// Nút Update giờ đang hiện vì ta bắt sự kiện nút sửa còn nút Lưu bị ẩn đi
		// Sau khi nhấn nút Update ta sẽ cho nút Lưu hiện ra còn nút Update lại ẩn đi
		document.getElementById("btnSave").type = "button";
		document.getElementById("btnUpdate").type = "hidden";
	}
}



