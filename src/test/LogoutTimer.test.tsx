import { test } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { LogoutTimerModal } from '../components/LogoutTimerModal'
import matchers from "@testing-library/jest-dom";
import { debug } from 'vitest-preview';
expect.extend(matchers);

it('renders the LogoutTimerModal', () => {
  render(
    <LogoutTimerModal 
      isOpen={true}
      onExtendSession={() => {}}
      onLogout={() => {}}
      seconds={10}
      minutes={0}
      progress={33}
      formatTime={num => num < 10 ? `0${num}` : num}
    />
  )

  expect(screen.getByTestId('logout-timer')).toBeInTheDocument()
})

it('calls onLogout when "Uitloggen" button is clicked', async () => {
  const onLogout = vi.fn()
  render(
    <LogoutTimerModal 
      isOpen={true}
      onExtendSession={() => {}}
      onLogout={onLogout}
      seconds={10}
      minutes={0}
      progress={33}
      formatTime={num => num < 10 ? `0${num}` : num}
    />
  )

  const logoutButton = screen.getByText(/Uitloggen/i)
  fireEvent.click(logoutButton)
  
  expect(onLogout).toHaveBeenCalled()
})

it('calls onExtendSession when "sessie verlengen" button is clicked', async () => {
  const onExtendSession = vi.fn()
  render(
    <LogoutTimerModal 
      isOpen={true}
      onExtendSession={onExtendSession}
      onLogout={() => {}}
      seconds={10}
      minutes={0}
      progress={33}
      formatTime={num => num < 10 ? `0${num}` : num}
    />
  )

  const extendSessionButton = screen.getByText(/sessie verlengen/i)
  fireEvent.click(extendSessionButton)
  
  expect(onExtendSession).toHaveBeenCalled()
})

it('displays the Opnieuw Inloggen button when time has run out', () => {
  render(
    <LogoutTimerModal 
      isOpen={true}
      onExtendSession={() => {}}
      onLogout={() => {}}
      seconds={0}
      minutes={0}
      progress={0}
      formatTime={num => num < 10 ? `0${num}` : num}
    />
  )
  debug()
  expect(screen.getByText(/Opnieuw Inloggen/i)).toBeInTheDocument()
})
