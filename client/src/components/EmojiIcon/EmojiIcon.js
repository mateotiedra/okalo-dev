const EmojiIcon = (props) => {
  return (
    <span
      style={{ fontFamily: 'Segoe UI Emoji, EmojiFont', fontSize: props.size }}
    >
      {props.icon}
    </span>
  );
};

export default EmojiIcon;
