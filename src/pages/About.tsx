import Pages from ".";

export default function About() {
  return (
    <Pages>
      <div>
        React challenges is a list of challenges designed to improve your
        frontend skills using the{" "}
        <a
          className={`text-blue-700`}
          href="https://reactjs.org/"
          target="_blank"
        >
          React
        </a>{" "}
        library. Each challenge has a name, a difficulty ranking (from Bronze to
        Grandmaster), and a list of requirements. Challenges are made up, found
        on the web, or from actual interviews. Potential future functions may
        include submissions, examples, and an online IDE.
      </div>
    </Pages>
  );
}
