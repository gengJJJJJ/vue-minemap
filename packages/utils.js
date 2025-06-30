// 参考：https://github.com/wandergis/coordtransform
// import coordtransform from "coordtransform";
// 百度经纬度坐标转国测局坐标
// coordtransform.bd09togcj02(116.404, 39.915);
// 国测局坐标转百度经纬度坐标
// coordtransform.gcj02tobd09(116.404, 39.915);
// wgs84转国测局坐标
// coordtransform.wgs84togcj02(116.404, 39.915);
// 国测局坐标转wgs84坐标
// coordtransform.gcj02towgs84(116.404, 39.915);
import coordtransform from 'coordtransform'

export function transform(center, type) {
	let [lon, lat] = center
	switch (type) {
		case 'bd09togcj02':
			return coordtransform.bd09togcj02(lon, lat)
		case 'gcj02tobd09':
			return coordtransform.gcj02tobd09(lon, lat)
		case 'wgs84togcj02':
			return coordtransform.wgs84togcj02(lon, lat)
		case 'gcj02towgs84':
			return coordtransform.gcj02towgs84(lon, lat)
		default:
			return [lon, lat]
	}
}
export const getPointData = ({
	list = [],
	lngName = 'longitude',
	latName = 'latitude',
	params = {},
	type = null
}) => {
	const features = []
	list.forEach((e, i) => {
		features.push({
			'type': 'Feature',
			'properties': Object.assign(e, params, {point_No: i + 1}),
			'geometry': {
				'type': 'Point',
				'coordinates': transform(e[lngName], e[latName], type)
			}
		})
	})

	return {
		'type': 'FeatureCollection',
		'features': features
	}
}
export const getLineData = ({list = [], params = {}, type = null}) => {
	const features = []
	list.forEach(e => {
		e.coordinates.forEach(coo => {
			features.push({
				'type': 'Feature',
				'properties': Object.assign(e.properties, params),
				'geometry': {
					'type': 'LineString',
					'coordinates': coo.map(c => transform(c, type))
				}
			})
		})
	})

	return {
		'features': features,
		'type': 'FeatureCollection'
	}
}
export const getPolylineData = ({list = [], params = {}, type = null}) => {
	const features = []
	features.push({
		'type': 'Feature',
		'properties': params,
		'geometry': {
			'type': 'MultiLineString',
			'coordinates': list.map(e => {
				const poly = e.split(';')
				return poly.map(p => transform(p.split(','), type))
			})
		}
	})
	return {
		'features': features,
		'type': 'FeatureCollection'
	}
}
export const getGeometryData = ({list = [], params = {}, type = null}) => {
	const features = []
	list.forEach(e => {
		features.push({
			'type': 'Feature',
			'properties': Object.assign(e.properties, params),
			'geometry': {
				type: e.type,
				coordinates: (e.coordinates || []).map(coo => {
					if (Array.isArray(coo[0])) {
						return coo.map(v => {
							return transform(v, type)
						})
					} else {
						return transform(coo, type)
					}
				})
			}
		})
	})

	return {
		'features': features,
		'type': 'FeatureCollection'
	}
}
export function initMap({
	scriptUrl = 'https://minedata.cn/minemapapi/v2.1.1/minemap.js',
	cssUrl = 'https://minedata.cn/minemapapi/v2.1.1/minemap.css'
}) {
	return Promise.all([loadCss(cssUrl), loadScript(scriptUrl)])
}
export function loadScript(url) {
	return new Promise(resolve => {
		const script = window.document?.createElement('script')
		if (!script) resolve()
		script.src = url
		script.onload = () => resolve()
		script.onerror = () => resolve()
		const body = window.document.body
		if (body && body.firstChild) {
			// 插入到 body 的第一个子节点之前
			body.insertBefore(script, body.firstChild)
		} else {
			// 如果 body 没有子节点，直接 append
			body.appendChild(script)
		}
	})
}
export function loadCss(url) {
	return new Promise(resolve => {
		const link = window.document?.createElement('link')
		if (!link) resolve()
		link.href = url
		link.type = 'text/css'
		link.rel = 'stylesheet'
		link.onload = () => resolve()
		link.onerror = () => resolve()
		window.document.head.appendChild(link)
	})
}
