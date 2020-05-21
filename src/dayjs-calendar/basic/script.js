import dayjs from 'dayjs'
import {weekdaysShort as weekdays} from 'dayjs/locale/ja'

// カレンダーを生成する要素
const element = document.querySelector('.c-calendar-container')
// 現在を取得
const now = dayjs()
// 月初の日付
const start = now.startOf('month')
// 月末の日付
const end = now.endOf('month')
// 月末の日にち
const endDate = end.get('date')
// 先月末の日にち
const lastEndDate = start.add(-1, 'day').get('date')
// 月初の曜日
const startWeekday = start.get('day')
// 月末の曜日
const endWeekday = end.get('day')
// カレンダーのHTML文字列
let calendar = ''

// table開始タグ
calendar += '<table class="c-calendar">'
// 年月を表示
calendar += `<caption class="c-calendar_title">${now.format('M')}月 ${now.format('YYYY')}</caption>`
// 曜日の見出しを作成
calendar += `<tr>${weekdays.map(weekday => `<th class="c-calendar_weekday">${weekday}</th>`).join('')}</tr>`
// tr開始タグ
calendar += '<tr>'

// 先月の日を埋める
for (let date = startWeekday; date > 0; date--) {
  calendar += `<td class="c-calendar_date -prev">${lastEndDate - date + 1}</td>`
}

// 当月の日にちを出力
for (let date = 1; date <= endDate; date++) {
  const current = now.set('date', date)
  const weekday = current.get('day')

  // 日曜日のとき
  if (weekday === 0) {
    calendar += '<tr>'
  }

  calendar += `<td class="c-calendar_date${date === now.get('date') ? ' -today' : ''}"><span>${date}</span></td>`

  // 土曜日のとき
  if (weekday === 6) {
    calendar += '</tr>'
  }
}

// 来月の日を埋める
for (let date = 1; date < 7 - endWeekday; date++) {
  calendar += `<td class="c-calendar_date -next">${date}</td>`
}

// 月末の曜日が土曜日でないとき
if (endWeekday !== 6) {
  calendar += '</tr>'
}

// table終了タグ
calendar += '</table>'

// HTML挿入
if (element) {
  element.insertAdjacentHTML('beforeend', calendar)
}