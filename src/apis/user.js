import request from "@/utils/request";
// 登录
export function login(data) {
  return request({
    url: `${import.meta.env}/admin/system/Login`,
    method: "post",
    data,
  });
}
