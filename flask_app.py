
# A very simple Flask Hello World app for you to get started with...

from flask import Flask, render_template, request, escape
from testflask import testflask
import MySQLdb
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["DEBUG"] = True
SQLALCHEMY_DATABASE_URI = "mysql+mysqlconnector://{username}:{password}@{hostname}/{databasename}".format(
    username="ulfekl",
    password="59LIF62lif",
    hostname="ulfekl.mysql.pythonanywhere-services.com",
    databasename="ulfekl$tags",
)

app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_POOL_RECYCLE"] = 299
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
class Tag(db.Model):
    __tablename__ = "tags"
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(4096))



def log_request(req: 'flask_request',res: str) -> None:
    with open('testFlask.log', 'a') as log:
        print(req.form,req.remote_addr,req.user_agent,res,file=log,sep='|')

@app.route("/")
def index():
    # return render_template("main_page.html")
    return render_template("tags.html")

@app.route("/user/<name>")
def user(name):
    return render_template("main_page.html", name=name)


@app.route('/addtag')
def addtag():
    tag = Tag(content="Tag1")
    db.session.add(tag)
    db.session.commit()
    return 'Added Tag1!!!'

@app.route('/gettags')
def gettags():
#    return "gettags"
    return render_template('viewtags.html',tags = Tag.query.all())


@app.route('/flasktest', methods=['GET','POST'])
def do_testFlask() -> str:
    phrase = request.form['phrase']
    #return str(testflask(phrase))
    title = 'Here are your results'
    results = str(testflask(phrase))
    log_request(request,results)
    return render_template('results.html',
                            the_title=title,
                            the_phrase=phrase,
                            the_results=results, )

@app.route('/entry')
def entry_page() ->'html':
    return render_template('entry.html',
                           the_title='Welcome to search4letters on the web!')

@app.route('/viewlog')
def view_the_log() -> str:
    contents = []
    with open ('testFlask.log') as log:
        for line in log:
            contents.append([])
            for item in line.split('|'):
                contents[-1].append(escape(item))
    titles = ('Form Data', 'Remote_addr', 'User_agent', 'Results')
    return render_template('viewlog.html',
                           the_title='View Log',
                           the_row_titles=titles,
                           the_data=contents,)

if __name__ == '__main__':
    app.run(debug=True)