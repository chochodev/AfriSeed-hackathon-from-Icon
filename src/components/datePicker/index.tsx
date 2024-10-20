import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { CalendarIcon } from 'lucide-react'

interface DeadlineDatePickerProps {
  selectedDate: Date | null
  onChange: (date: Date | null) => void
}

export default function DeadlineDatePicker({ selectedDate, onChange }: DeadlineDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleChange = (date: Date | null) => {
    onChange(date)
    setIsOpen(false)
  }

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  return (
    <div className="relative">
      <div className="flex items-center">
        <input
          type="text"
          value={selectedDate ? selectedDate.toLocaleDateString() : ''}
          readOnly
          className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="Select deadline"
          onClick={() => setIsOpen(true)}
        />
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="px-3 py-2 bg-primary-500 text-white rounded-r-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <CalendarIcon className="w-5 h-5" />
        </button>
      </div>
      {isOpen && (
        <DatePicker
          selected={selectedDate}
          onChange={handleChange}
          minDate={tomorrow}
          inline
          calendarClassName="absolute z-10 bg-white shadow-lg rounded-md mt-1"
        />
      )}
    </div>
  )
}