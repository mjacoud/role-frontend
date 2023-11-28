'use client'

import Calendar from 'react-calendar'

interface EventCalendarProps {
  dateRange: [Date, Date]
}

export default function EventCalendar({ dateRange }: EventCalendarProps) {
  return (
    <div className="flex flex-row justify-center">
      <Calendar
        defaultValue={[new Date(dateRange[0]), new Date(dateRange[1])]}
        minDate={new Date(dateRange[0])}
        maxDate={new Date(dateRange[1])}
        selectRange
      />
    </div>
  )
}
