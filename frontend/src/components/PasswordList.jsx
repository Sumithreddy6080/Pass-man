// components/PasswordList.jsx
import React from "react";
import { Eye, EyeOff, Edit, Trash2 } from "lucide-react";

const PasswordList = ({
  passwords,
  visiblePasswords,
  onToggleVisibility,
  onEdit,
  onDelete,
  themeClasses,
}) => {
  if (passwords.length === 0) {
    return (
      <div className='space-y-4'>
        {/* Header Row */}
        <div
          className={`grid grid-cols-12 gap-4 px-4 py-2 text-sm ${themeClasses.textSecondary} border-b ${themeClasses.border}`}
        >
          <div className='col-span-3'>Title</div>
          <div className='col-span-3'>Username</div>
          <div className='col-span-4'>Password</div>
          <div className='col-span-2 text-center'>Actions</div>
        </div>
        {/* Empty State */}
        <div className={`text-center py-8 ${themeClasses.textSecondary}`}>
          <p>A list of your recent saved passwords.</p>
          <p className='text-sm mt-2'>
            No passwords saved yet. Click "Save a new password" to get started!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {/* Header Row */}
      <div
        className={`grid grid-cols-12 gap-4 px-4 py-2 text-sm ${themeClasses.textSecondary} border-b ${themeClasses.border}`}
      >
        <div className='col-span-3'>Title</div>
        <div className='col-span-3'>Username</div>
        <div className='col-span-4'>Password</div>
        <div className='col-span-2 text-center'>Actions</div>
      </div>
      {/* Password Rows */}
      {passwords.map((password) => (
        <PasswordRow
          key={password._id || password.id}
          password={password}
          isVisible={visiblePasswords[password._id || password.id]}
          onToggleVisibility={() =>
            onToggleVisibility(password._id || password.id)
          }
          onEdit={() => onEdit(password)}
          onDelete={() => onDelete(password._id || password.id)}
          themeClasses={themeClasses}
        />
      ))}
    </div>
  );
};

const PasswordRow = ({
  password,
  isVisible,
  onToggleVisibility,
  onEdit,
  onDelete,
  themeClasses,
}) => {
  const maskPassword = (pwd) => "•".repeat(pwd.length);

  const handleDelete = async () => {
    try {
      console.log("Deleting password:", password._id || password.id);
      await onDelete();
    } catch (error) {
      console.error("Delete failed:", error);
      alert(`Failed to delete password: ${error.message}`);
    }
  };

  return (
    <div
      className={`grid grid-cols-12 gap-4 px-4 py-3 ${themeClasses.cardBg} rounded hover:opacity-80 transition-opacity`}
    >
      {/* Website/Title */}
      <div
        className='col-span-3 truncate'
        title={password.website || password.title}
      >
        {password.website || password.title}
      </div>

      {/* Username */}
      <div className='col-span-3 truncate' title={password.username}>
        {password.username}
      </div>

      {/* Password with Toggle */}
      <div className='col-span-4 flex items-center space-x-2'>
        <span
          className='truncate font-mono flex-1'
          title={isVisible ? password.password : "Hidden"}
        >
          {isVisible ? password.password : maskPassword(password.password)}
        </span>
        <button
          onClick={onToggleVisibility}
          className={`p-1 ${themeClasses.hoverBg} rounded transition-colors flex-shrink-0`}
          title={isVisible ? "Hide password" : "Show password"}
          aria-label={isVisible ? "Hide password" : "Show password"}
        >
          {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      {/* Actions */}
      <div className='col-span-2 flex items-center justify-center space-x-2'>
        <button
          onClick={onEdit}
          className={`p-1 ${themeClasses.hoverBg} rounded text-blue-500 hover:text-blue-600 transition-colors`}
          title='Edit password'
          aria-label='Edit password'
        >
          <Edit size={16} />
        </button>
        <button
          onClick={onDelete}
          className={`p-1 ${themeClasses.hoverBg} rounded text-red-500 hover:text-red-600 transition-colors`}
          title='Delete password'
          aria-label='Delete password'
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default PasswordList;
