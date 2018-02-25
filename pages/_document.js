import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage()
    const styles = flush()
    return { html, head, errorHtml, chunks, styles }
  }

  render() {
    return (
      <html>
        <Head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />

          <title>Conference</title>

          <link href="inspina/css/bootstrap.min.css" rel="stylesheet" />
          <link href="inspina/font-awesome/css/font-awesome.css" rel="stylesheet" />
          <link href="inspina/css/animate.css" rel="stylesheet" />
          <link href="inspina/css/plugins/codemirror/codemirror.css" rel="stylesheet" />
          <link href="inspina/css/plugins/codemirror/ambiance.css" rel="stylesheet" />
          <link href="inspina/css/plugins/toastr/toastr.min.css" rel="stylesheet" />
          <link href="inspina/js/plugins/gritter/jquery.gritter.css" rel="stylesheet" />
          <link href="inspina/css/style.css" rel="stylesheet" />
          <link href="css/conference.css" rel="stylesheet" />

          <script src="js/pace.init.js"></script>

          <script src="inspina/js/jquery-3.1.1.min.js"></script>
          
        </Head>
        <body className="fixed-sidebar no-skin-config full-height-layout">
          {this.props.customValue}

<div id="wrapper">

    <div id="page-wrapper" className="gray-bg">
    <div className="row border-bottom">
    <nav className="navbar navbar-static-top" role="navigation" style={{ marginBottom: 0 }}>
    <div className="navbar-header">
        <a className="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#"><i className="fa fa-bars"></i> </a>
        <h2 className="m-r-sm text-muted nav-message nav-logo">Logo</h2>
    </div>
        <ul className="nav navbar-top-links navbar-right">
            <li>
                <a className="dropdown-toggle count-info" data-toggle="dropdown" href="#">
                    <span className="m-r-sm text-muted nav-message">Help</span>
                    <i className="fa fa fa-question"></i>
                </a>
            </li>
        </ul>

        <ul className="nav navbar-top-links navbar-right" style={{ marginRight: 'calc(50% - 200px)' }}>
            <li>
                <a className="dropdown-toggle tool-time" data-toggle="dropdown" href="#">
                    <i className="fa fa-clock-o"></i>
                    <span className="m-r-sm text-muted nav-message">00 : 00</span>
                </a>
            </li>
            <li className="dropdown">
                <a className="dropdown-toggle tool-hangup" data-toggle="dropdown" href="#">
                    <i className="fa fa-phone"></i>
                </a>
            </li>
            <li className="dropdown">
                <a className="dropdown-toggle tool-play" data-toggle="dropdown" href="#">
                    <i className="fa fa-caret-right"></i>
                </a>
            </li>
        </ul>

    </nav>
    </div>
        <div className="fh-breadcrumb">

            <Main />
            <NextScript />

        </div>

    <div className="footer">
        <div className="pull-right">
            10GB of <strong>250GB</strong> Free.
        </div>
        <div>
            <strong>Copyright</strong> Example Company &copy; 2014-2017
        </div>
    </div>

    </div>
    </div>

<script src="inspina/js/bootstrap.min.js"></script>
<script src="inspina/js/plugins/metisMenu/jquery.metisMenu.js"></script>
<script src="inspina/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>
<script src="inspina/js/inspinia.js"></script>

<script src="https://cdn.WebRTC-Experiment.com/getScreenId.js"></script>

        </body>
      </html>
    )
  }
}