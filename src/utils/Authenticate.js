export default async token => {
    let authorized;
    try {
        const response = await fetch(`http://testbean2-env.us-east-1.elasticbeanstalk.com/api/authorize`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        authorized = await response.json();
    } catch (err) {
        //
    } finally {
      return authorized;
    }
};