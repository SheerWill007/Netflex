export default function ApiError() {
  return (
    <div className="empty-state" role="alert">
      <h1>We can&apos;t reach the catalogue right now</h1>
      <p>
        The Netflex API isn&apos;t responding. If you&apos;re running locally, start it with{' '}
        <code>npm run server:dev</code> and refresh.
      </p>
    </div>
  );
}
