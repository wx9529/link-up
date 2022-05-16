const AuthModal = ({setShowModal}) => {

  const handleClick = () => {
    setShowModal(false)
  }
  return (
    <div className="auth-modal">
      <div onClick={handleClick}>
        x
      </div>
      Auth Modal
    </div>
  )
}
export default AuthModal