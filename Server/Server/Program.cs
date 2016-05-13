using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Server
{
    class Program
    {
        static void Main(string[] args)
        {   
            HttpListener listener = null;i
            try
            {   
                listener = new HttpListener();
                listener.Prefixes.Add("http://localhost:1234/server/");
                listener.Start()
                while(true)
                {
                    Console.WriteLine("waiting for connection");
                    HttpListenerContext context = listener.GetContext();
                    String media = context.Request.QueryString["media"];
                    String requesttype = context.Request.QueryString["requesttype"];
                    Console.WriteLine(media);
                    Console.WriteLine(requesttype);
                    //String reqcontent = content from the http request         //need the front-end send the http request
                    string reqcontent = "getname";      //set value now for testing Database part

                    string replymsg = "Welcome to ValuableSwap";
                    context.Response.ContentLength64 = Encoding.UTF8.GetByteCount(replymsg);
                    context.Response.StatusCode = (int)HttpStatusCode.OK;
                    using(Stream strm= context.Response.OutputStream)
                    {
                        using (StreamWriter writer = new StreamWriter(strm))
                        {
                            writer.Write(replymsg);
                        }
                    }
                   // Console.WriteLine("reply msg");

                    //Databasepart
                    SqlConnection conn = new SqlConnection("Server=titan.csse.rose-hulman.edu;Initial Catalog=ValuableSwaps;user id = reitersg; password=8506Circle;");
                    conn.Open();
                    if(requesttype=="0" && media == "game")
                    {
                        SqlCommand cmd = new SqlCommand("SELECT Name, condition FROM [Media] WHERE availabile = 1", conn);
                        SqlDataReader reader = cmd.ExecuteReader();
                        Console.WriteLine();
                        Console.WriteLine("The avaliable games Are: ");
                        String jsonstr = "";
                        while (reader.Read())
                        {
                            jsonstr = "Name:" + reader.GetString(0) + ";  Condition: " + reader.GetString(1);
                            Console.WriteLine(jsonstr);
                        }
                        reader.Close();
                    }
                    /*
                    if (reqcontent == "getname")
                    {
                        SqlCommand cmd = new SqlCommand("SELECT Name FROM [VS_User]", conn);
                        SqlDataReader reader = cmd.ExecuteReader();
                        Console.WriteLine();
                        Console.WriteLine("The Names Are: ");
                        while (reader.Read())
                        {
                            Console.WriteLine(reader.GetString(0));
                        }
                        reader.Close();
                    }
                    */
                    conn.Close();
                    if (Debugger.IsAttached)
                    {
                        Console.ReadLine();
                    }
                }
            }
            catch(WebException e)
            {
                Console.WriteLine(e.Status);
            }
        }
    }
}
